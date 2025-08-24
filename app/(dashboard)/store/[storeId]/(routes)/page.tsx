import {
  getTotalRevenue,
  getStockCount,
  getTotalSales,
  getMontlyRevenue,
  getStoreUrl,
} from "@/actions/statsActions";
import Heading from "@/components/heading";
import BarChartCard from "@/components/statBarChart";
import StatCard from "@/components/ui/statCard";
import { CreditCard, DollarSign, Package, Plus } from "lucide-react";
import React from "react";

export const metadata = {
  title: "Overview",
  description: "Store Dashboard Overview Page",
};

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;
  const totalRevenue = await getTotalRevenue(storeId);
  const totalSales = await getTotalSales(storeId);
  const stockCount = await getStockCount(storeId);
  const monthlyRevenue = await getMontlyRevenue(storeId);
  const storeUrl = await getStoreUrl(storeId);

  return (
    <div className="space-y-5">
      <Heading
        header="Dashboard"
        description="Overview of your store"
        link={storeUrl}
        separator
      />

      <div className="flex flex-wrap gap-4 sm:flex-nowrap lg:gap-8">
        <StatCard
          className="w-full"
          title="Total Revenue"
          icon={<DollarSign size={20} />}
          dataType="currency"
          data={totalRevenue}
        />
        <StatCard
          className="w-full"
          title="Sales"
          icon={<CreditCard size={20} />}
          dataType="number"
          dataIcon={<Plus size={20} />}
          data={totalSales}
        />
        <StatCard
          className="w-full"
          title="Products In Stock"
          icon={<Package size={20} />}
          dataType="number"
          data={stockCount}
        />
      </div>

      <BarChartCard data={monthlyRevenue}></BarChartCard>
    </div>
  );
}
