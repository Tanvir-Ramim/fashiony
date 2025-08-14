const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const mongoosePaginate = require("mongoose-paginate-v2");

const assetSchema = new Schema(
  {
    asset_type: {
      type: String,
      enum: [
        "Image-Banner",
        "Info-Text",
        "Image-Brand",
        "Image-Theme",
        "Image-Offer",
        "Image-Category",
        "Image-Combo",
      ],
    },
    position: { type: String, trim: true, default: "" },
    title: { type: String, default: "" },
    link: { type: String, default: null },
    tag: {
      type: String,
      // enum: ["winter", "summer", "yearend", "offer", "new"],
      default: null,
    },
    description: { type: String, default: "" },
    url: {
      public_id: { type: String, default: "" },
      url: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

//tag
assetSchema.pre("save", function (next) {
  if (["winter", "summer", "yearend", "offer", "new"].includes(this.tag)) {
    this.tag = `${process.env.CLIENT_URL}/shop?tag=${this.tag}`;
  }
  next();
});

// tag / link validation
assetSchema.pre("save", function (next) {
  const hasLink = !!this.link;
  const hasTag = !!this.tag;

  if (hasLink && hasTag) {
    return next(new Error("Provide either 'link' or 'tag', but not both."));
  }

  // if (!hasLink && !hasTag) {
  //   return next(new Error("Either 'link' or 'tag' must be provided."));
  // }

  next();
});

module.exports = {
  Asset: mongoose.model("Asset", assetSchema),
};
