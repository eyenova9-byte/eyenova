import { NextResponse } from "next/server";
import { verifyOtpCode } from "@/lib/sms";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { phone, otp } = await request.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { success: false, error: "Phone number and OTP are required" },
        { status: 400 }
      );
    }

    const isValid = await verifyOtpCode(phone, otp);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired OTP code" },
        { status: 400 }
      );
    }

    const formattedPhone = phone.startsWith("+974") ? phone : `+974${phone.replace(/\s+/g, "")}`;

    // Find or create customer record in database
    let user = null;
    try {
      user = await prisma.user.findFirst({
        where: { phone: formattedPhone },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            phone: formattedPhone,
            fullName: "Customer",
            role: "CUSTOMER",
          },
        });
      }
    } catch (e) {
      // Offline fallback
      user = {
        id: `usr-${Date.now()}`,
        phone: formattedPhone,
        fullName: "Qatar Customer",
        role: "CUSTOMER",
      };
    }

    return NextResponse.json({
      success: true,
      user,
      message: "Successfully authenticated via OTP.",
    });
  } catch (error) {
    console.error("Failed to verify OTP:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}
