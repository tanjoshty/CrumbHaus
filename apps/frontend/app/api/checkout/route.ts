import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest): Promise<NextResponse> {
  return NextResponse.json({
    message: "hi"
  })
}