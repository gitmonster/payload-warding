import type { CollectionConfig } from "payload/types";
import { populateAuthors } from "./hooks/populateAuthors";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  hooks: {
    afterRead: [populateAuthors],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "authors",
      type: "relationship",
      relationTo: "user",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "populatedAuthors",
      type: "array",
      admin: {
        readOnly: true,
        disabled: true,
      },
      fields: [
        {
          name: "id",
          type: "text",
        },
        {
          name: "email",
          type: "text",
        },
      ],
    },
    {
      name: "relatedPosts",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        };
      },
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      index: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
