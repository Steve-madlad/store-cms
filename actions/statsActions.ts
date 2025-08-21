"use server";

import db from "@/lib/prisma";
import { ChartData } from "@/models/components";

export async function getStoreUrl(storeId: string): Promise<string> {
  const store = await db.store.findUnique({
    where: {
      id: storeId,
    },
  });

  return store?.storeUrl || "";
}

export async function getTotalRevenue(storeId: string): Promise<number> {
  const paidOrders = await db.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = paidOrders.reduce((total: number, order) => {
    const ordersRevenue = order.orderItems.reduce((sum: number, item) => {
      return sum + Number(item.product.price);
    }, 0);

    return total + ordersRevenue;
  }, 0);

  return totalRevenue;
}

export async function getTotalSales(storeId: string): Promise<number> {
  const salesCount = await db.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });

  return salesCount;
}

export async function getStockCount(storeId: string): Promise<number> {
  const productCount = await db.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return productCount;
}

export async function getMontlyRevenue(storeId: string): Promise<ChartData[]> {
  const paidOrders = await db.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const montlyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();
    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += Number(item.product.price);
    }

    montlyRevenue[month] = (montlyRevenue[month] || 0) + revenueForOrder;
  }

  const chartData: ChartData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  for (const month in montlyRevenue) {
    chartData[month].total = montlyRevenue[Number(month)];
  }

  return chartData;
}
