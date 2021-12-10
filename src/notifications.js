export function sendNotification(data) {
  let headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: "Basic 'MTlmZGQ4MDYtMDQxZS00MzE3LWE1NDgtMWIwMTNlNzMxNTcw'",
  };

  let endpoint = "https://onesignal.com/api/v1/notifications";

  let params = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      app_id: 'ab53344b-5cee-4fea-b079-3b5052a3be9f',
      headings: {en: 'Bananas en Smoking!'},
      contents: {en: data},
    }),
  };
  fetch(endpoint, params).then(res => console.log(res));
}