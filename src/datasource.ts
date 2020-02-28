import { RESTDataSource } from "apollo-datasource-rest";
import get from "lodash/get";

export class RedditAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://www.reddit.com/";
  }

  async getComment(id: string) {
    return get(
      await this.get(`api/info.json`, {
        id: `t1_${id}`
      }),
      "data.children[0].data"
    );
  }

  async getPost(id: string) {
    return get(
      await this.get(`api/info.json`, {
        id: `t3_${id}`
      }),
      "data.children[0].data"
    );
  }

  async getComments({
    limit = 25,
    before,
    after
  }: {
    limit: number;
    before: string;
    after: string;
  }) {
    return get<any[]>(
      await this.get(`user/SchnoodleDoodleDo/comments.json`, {
        limit,
        before: !!before && `t1_${before}`,
        after: !!after && `t1_${after}`
      }),
      "data.children",
      []
    ).map(comment => comment.data);
  }
}
