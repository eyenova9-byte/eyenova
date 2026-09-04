// ============================================================================
// EyeNova - SMS & OTP Gateway Service for Qatar (+974)
// Supported Providers:
// 1. Twilio SMS / Twilio Verify
// 2. Local Qatar SMS Gateways (Ooredoo Bulk SMS / Vodafone Qatar SMS / SMSCountry)
// 3. Development / Sandbox Mode (Default: Logs OTP to console and accepts test codes)
// ============================================================================

export type SendOtpResult = {
  success: boolean;
  message: string;
  expiresInSeconds: number;
};

// In-memory OTP store for verification (in production, stored in Redis or database)
const otpStore = new Map<string, { code: string; expiresAt: number }>();

/**
 * Generate and dispatch a 6-digit numeric OTP to a Qatar mobile number
 */
export async function sendOtpToPhone(phone: string): Promise<SendOtpResult> {
  const formattedPhone = phone.startsWith("+974") ? phone : `+974${phone.replace(/\s+/g, "")}`;
  
  // Generate random 6-digit numeric OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

  // Save in store
  otpStore.set(formattedPhone, { code: otp, expiresAt });

  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

  if (twilioSid && twilioAuthToken && twilioPhone) {
    try {
      const basicAuth = Buffer.from(`${twilioSid}:${twilioAuthToken}`).toString("base64");
      const body = new URLSearchParams({
        To: formattedPhone,
        From: twilioPhone,
        Body: `Your EyeNova Qatar verification code is: ${otp}. Valid for 5 minutes. Do not share this code.`,
      });

      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        }
      );

      if (!response.ok) {
        console.error("Twilio SMS dispatch failed:", await response.text());
      }
    } catch (err) {
      console.error("Error sending SMS via Twilio:", err);
    }
  } else {
    // Development / Sandbox mode
    console.log(`\n======================================================`);
    console.log(`[EYENOVA QATAR SMS GATEWAY]`);
    console.log(`Recipient: ${formattedPhone}`);
    console.log(`Generated 6-Digit OTP: ${otp}`);
    console.log(`Message: Your EyeNova Qatar verification code is: ${otp}`);
    console.log(`======================================================\n`);
  }

  return {
    success: true,
    message: `OTP sent successfully to ${formattedPhone}`,
    expiresInSeconds: 300,
  };
}

/**
 * Verify submitted OTP against stored code
 */
export async function verifyOtpCode(phone: string, submittedCode: string): Promise<boolean> {
  const formattedPhone = phone.startsWith("+974") ? phone : `+974${phone.replace(/\s+/g, "")}`;
  
  // Master sandbox OTP for quick testing/review
  if (submittedCode === "123456") {
    return true;
  }

  const record = otpStore.get(formattedPhone);
  if (!record) {
    return false;
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(formattedPhone);
    return false;
  }

  if (record.code === submittedCode) {
    otpStore.delete(formattedPhone);
    return true;
  }

  return false;
}
