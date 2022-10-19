import { client } from "../support/http-client";
import { METHODS } from "../support/types";
import { expect } from "chai";
import {
  COMMENT_COUNT,
  EXPECT_OBJ,
  ID,
  INVALID_ID,
  NEW_COMMENT,
  NEW_BODY,
} from "../support/constants";

let res;

describe("Test HTTP methods", () => {
  describe(`${METHODS.GET} method`, () => {
    it("Should return 100 posts", async () => {
      try {
        res = await client.request(METHODS.GET, { url: "/posts" });
      } catch (error: any) {
        throw new Error(error.message);
      }
      expect(res.status).to.equal(200);
      expect(res.data.length).to.equal(100);
    });

    it(`Should return post with existing ID:${ID}`, async () => {
      try {
        res = await client.request(METHODS.GET, { url: `/posts/${ID}` });
      } catch (error: any) {
        throw new Error(error.message);
      }
      expect(JSON.stringify(res.data)).to.equal(JSON.stringify(EXPECT_OBJ));
      expect(res.status).to.equal(200);
    });

    it(`Should return 404 error with non-existing ID:${INVALID_ID}`, async () => {
      try {
        res = await client.request(METHODS.GET, {
          url: `/posts/${INVALID_ID}`,
        });
      } catch (error: any) {
        expect(error.response.status).to.equal(404);
      }
    });

    it(`Should return ${COMMENT_COUNT} comments for post with ID:${ID}`, async () => {
      try {
        res = await client.request(METHODS.GET, {
          url: `/posts/${ID}/comments`,
        });
      } catch (error: any) {
        throw new Error(error.message);
      }
      expect(res.status).to.equal(200);
      expect(res.data.length).to.equal(COMMENT_COUNT);
    });
  });

  describe(`${METHODS.POST} method`, () => {
    it(`Should create new comment for post with ID:${ID}`, async () => {
      try {
        res = await client.request(METHODS.POST, {
          url: `posts/${ID}/comments`,
          body: NEW_COMMENT,
          headers: { "Content-Type": "application/json" },
        });
      } catch (error: any) {
        throw new Error(error.message);
      }
      expect(res.status).to.equal(201);
      expect(res.data["postId"]).to.equal(`${ID}`);
    });

    it(`Should not create new comment for post with missing ID:${ID} in url`, async () => {
      try {
        res = await client.request(METHODS.POST, {
          url: `posts//comments`,
          body: NEW_COMMENT,
          headers: { "Content-Type": "application/json" },
        });
      } catch (error: any) {
        expect(error.response.status).to.equal(404);
      }
    });
  });

  describe(`${METHODS.PUT} & ${METHODS.PATCH} methods`, () => {
    it(`Should update body post with ID:${ID} via put`, async () => {
      try {
        res = await client.request(METHODS.PUT, {
          url: `posts/${ID}`,
          body: NEW_BODY,
          headers: { "Content-Type": "application/json" },
        });
      } catch (error: any) {
        throw new Error(error.message);
      }
      expect(res.status).to.equal(200);
    });

    it(`Should update body post with ID:${ID} via patch`, async () => {
      try {
        res = await client.request(METHODS.PATCH, {
          url: `posts/${ID}`,
          body: NEW_BODY,
          headers: { "Content-Type": "application/json" },
        });
      } catch (error: any) {
        throw new Error(error.message);
      }
      expect(res.status).to.equal(200);
      expect(JSON.stringify(res.data)).to.equal(
        JSON.stringify({
          ...EXPECT_OBJ,
          body: "New test",
        })
      );
    });
  });

  it(`Should delete post with ID:${ID} via ${METHODS.DELETE}`, async () => {
    try {
      res = await client.request(METHODS.DELETE, {
        url: `posts/${ID}`,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
    expect(res.status).to.equal(200);
  });
});
