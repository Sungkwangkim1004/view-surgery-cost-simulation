export type ShareResult = "shared" | "copied" | "failed";

export function shareViaEmail(subject: string, body: string): void {
  const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = url;
}

export function canUseNativeShare(): boolean {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

export async function shareViaKakao(
  subject: string,
  body: string
): Promise<ShareResult> {
  if (canUseNativeShare()) {
    try {
      await navigator.share({ title: subject, text: body });
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return "failed";
      }
    }
  }

  try {
    await navigator.clipboard.writeText(body);
    return "copied";
  } catch {
    return "failed";
  }
}
