async function generateReleaseNotes(fileList, diffText, ticketNumber) {
  const prompt = `Please generate a concise and well-structured changelog for 
both technical and non-technical stakeholders based on the following code changes.

The changelog should have the following sections:

- **New Features**
- **Improvements**
- **Technical Details**

The output should be plain text format with:

1. Release Notes for Ticket Number
2. Formatted DateTime
3. Bullet points under each section.
`;

  const currentDateTime = new Date();
  const formattedDateTime = currentDateTime
    .toLocaleString("en-US", {
      day: "numeric",
      hour: "2-digit",
      hour12: true,
      minute: "2-digit",
      month: "long",
      timeZone: "America/New_York",
      timeZoneName: "short",
      year: "numeric",
    })
    .replace(",", " -");

  try {
    const response = await fetch(
      "https://models.inference.ai.azure.com/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "You are a professional release note generator for enterprise software teams.",
            },
            {
              role: "user",
              content: `
${prompt}

### Changed Files:
${fileList}

### Git Diff:
${diffText}

Date: ${formattedDateTime}
Ticket: ${ticketNumber}
`,
            },
          ],
          temperature: 0.4,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub Models API error: ${errorText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content;
  } catch (error) {
    console.log("Error generating release notes:", error);
    return null;
  }
}

export default generateReleaseNotes;