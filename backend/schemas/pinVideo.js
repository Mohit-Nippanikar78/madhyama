export default {
  name: "pinVideo",
  type: "document",
  title: "PinVideo",
  liveEdit: true,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "about",
      title: "About",
      type: "string",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
    },
    {
      name: "videourl",
      title: "VideoUrl",
      type: "string",
    },
    {
      name: "userId",
      title: "UserId",
      type: "string",
    },
    {
      name: "postedBy",
      title: "PostedBy",
      type: "postedBy",
    },
    {
      name: "save",
      title: "Save",
      type: "array",
      of: [{ type: "save" }],
    },
    {
      name: "comments",
      title: "Comments",
      type: "array",
      of: [{ type: "comment" }],
    },
    {
      name: "likes",
      title: "Likes",
      type: "array",
      of: [{ type: "likes" }],
    },
    {
      name: "likesCount",
      title: "Likes Numbers ",
      type: "number",
    },
  ],
};
