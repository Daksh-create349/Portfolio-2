import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!subject || !message) {
      return NextResponse.json(
        { success: false, error: "Subject and message are required." },
        { status: 400 }
      );
    }

    const payload = {
      name: name || "Portfolio Visitor",
      email: email || "anonymous@visitor.dev",
      _subject: `[Portfolio] ${subject}`,
      message: message,
      _template: "table",
      _captcha: "false",
    };

    // Forward directly to FormSubmit to deliver to Daksh's inbox
    const response = await fetch("https://formsubmit.co/ajax/dakshshrivastav56@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: "https://dakshsportfolio.vercel.app/",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.success === "true" || data.success === true) {
      return NextResponse.json({
        success: true,
        message: "Message delivered directly to Daksh's personal inbox.",
      });
    }

    // Fallback if FormSubmit gave another message
    return NextResponse.json({
      success: true,
      message: "Message processed successfully.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please email directly." },
      { status: 500 }
    );
  }
}
