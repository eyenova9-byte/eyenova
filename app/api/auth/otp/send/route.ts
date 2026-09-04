import { NextResponse } from "next/server";
import { sendOtpToPhone } from "@/lib/sms";

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400 }
      );
    }

    const result = await sendOtpToPhone(phone);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to send OTP:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send verification SMS" },
      { status: 500 }
    );
  }
}
