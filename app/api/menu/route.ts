import { getMenuItems } from "@/lib/server-data";
import { jsonOk } from "@/lib/api";

export async function GET() {
  const items = await getMenuItems();
  return jsonOk({ items });
}
