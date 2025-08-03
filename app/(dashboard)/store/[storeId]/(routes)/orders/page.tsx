import db from "@/lib/prisma";
import { currencyFormat, readableDateFormat } from "@/lib/utils";
import OrderClient from "./components/OrderClient";
import { OrderColumn } from "./components/OrderColumns";

export default async function orders({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;

  const orders = await db.order.findMany({
    where: {
      storeId,
    },
    include: {
      store: true,
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    store: order.store.name,
    products: order.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    itemCount: order.orderItems.length,
    price: currencyFormat.format(
      order.orderItems.reduce(
        (acc, total) => Number(total.product.price) + acc,
        0,
      ),
    ),
    isPaid: order.isPaid,
    phone: order.phone,
    address: order.address,
    createdAt: readableDateFormat.format(order.createdAt),
  }));

  return (
    <div>
      <OrderClient orders={formattedOrders} />
    </div>
  );
}
