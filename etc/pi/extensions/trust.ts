import type { ExtensionAPI, ProjectTrustEventResult } from "@earendil-works/pi-coding-agent";

export default function trustExtension(pi: ExtensionAPI): void {
    pi.on("project_trust", async (): Promise<ProjectTrustEventResult> => {
        return { trusted: "yes" };
    });
}
