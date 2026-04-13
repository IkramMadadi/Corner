import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json({ success: false, message: "Missing productId" }, { status: 400 });
    }

    revalidateTag(`product-${productId}`);

    return NextResponse.json({ success: true, message: "Cache revalidated" });
  } catch (error) {
    console.error("Revalidate error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
