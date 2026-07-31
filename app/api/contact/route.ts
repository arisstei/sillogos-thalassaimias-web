import { NextResponse } from "next/server";

// Στέλνει τα μηνύματα της φόρμας επικοινωνίας μέσω Web3Forms (δωρεάν, χωρίς
// δικό μας SMTP server) στο email του συλλόγου.
//
// Χρειάζεται 2 environment variables στο Vercel (Project → Settings →
// Environment Variables):
//   WEB3FORMS_ACCESS_KEY  -> το κλειδί που παίρνεις δωρεάν από web3forms.com
//   CONTACT_EMAIL          -> το πραγματικό email του συλλόγου που θα λαμβάνει τα μηνύματα

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  const toEmail = process.env.CONTACT_EMAIL;

  if (!accessKey || !toEmail) {
    return NextResponse.json(
      { success: false, error: "Η φόρμα επικοινωνίας δεν έχει ρυθμιστεί ακόμα (λείπουν environment variables)." },
      { status: 500 }
    );
  }

  let body: { name?: string; email?: string; phone?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Μη έγκυρα δεδομένα." }, { status: 400 });
  }

  const { name, email, phone, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, error: "Συμπλήρωσε ονοματεπώνυμο, email και μήνυμα." },
      { status: 400 }
    );
  }

  try {
    const web3formsRes = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        to_email: toEmail,
        subject: `Νέο μήνυμα επικοινωνίας από ${name} (site Συλλόγου)`,
        from_name: name,
        name,
        email,
        phone: phone || "-",
        message,
      }),
    });

    const result = await web3formsRes.json();

    if (result.success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json(
      { success: false, error: result.message || "Η αποστολή απέτυχε." },
      { status: 502 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Σφάλμα σύνδεσης με την υπηρεσία αποστολής email." },
      { status: 502 }
    );
  }
}
