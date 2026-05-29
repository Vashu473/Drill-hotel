import SiteLayout from "@/components/layout/SiteLayout";
import MenuSection from "@/components/home/MenuSection";
import { getMenuItems } from "@/lib/server-data";

export const metadata = {
  title: "Menu | Deli Grill",
  description: "Full menu — signature sandwiches, prime grills, and New York classics.",
};

export default async function MenuPage() {
  const menuItems = await getMenuItems();

  return (
    <SiteLayout>
      <MenuSection items={menuItems} />
    </SiteLayout>
  );
}
