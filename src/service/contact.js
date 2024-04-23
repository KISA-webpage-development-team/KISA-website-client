// api call for contact page: sending email
export async function sendEmail(data) {
  try {
    const emailData = JSON.stringify(data);
    const apiEndpoint = "/api/email";

    const res = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: emailData,
    });
    const resData = await res.json();
    return resData;
  } catch (err) {
    console.error(err);
  }
}
