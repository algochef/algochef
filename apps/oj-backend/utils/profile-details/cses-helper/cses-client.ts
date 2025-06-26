import { addFriendHelper } from "./add-friend";
import { getCSESSession } from "./get-session";
import { getTotalSolveHelper } from "./get-total-solve-count";

export class CSESClient {
  private createdAt: number;
  private sessionId: string;
  constructor(sessionId: string) {
    this.createdAt = Date.now();
    this.sessionId = sessionId;
  }

  static async create(): Promise<CSESClient> {
    const sessionId = await getCSESSession();
    if (!sessionId) {
      throw new Error("Failed to generate sessionId");
    }
    return new CSESClient(sessionId);
  }

  addFriend = async (userId: number) => {
    if (Date.now() - this.createdAt > 6 * 60 * 60 * 1000) {
      const sessId = await getCSESSession();
      if (!sessId) {
        throw new Error("Failed to generate sessionId");
      }
      this.sessionId = sessId;
      this.createdAt = Date.now();
    }
    await addFriendHelper(this.sessionId, userId);
  };

  getSolveCount = async (userId: number) => {
    return await getTotalSolveHelper(this.sessionId, userId);
  };
}

// (async () => {
//     const client = await CSESClient.create();
//     await client.addFriend(165802);
//     console.log(await client.getSolveCount(165802));
// })()
