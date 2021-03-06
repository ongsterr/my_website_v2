const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slug = require('slug');
const { Schema } = mongoose;

const ArticleSchema = new Schema(
  {
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
    title: String,
    description: String,
    body: String,
    tagList: [{ type: String }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    usePushEach: true,
  }
);

ArticleSchema.plugin(uniqueValidator, { message: 'is already taken' });

ArticleSchema.methods.slugify = function() {
  this.slug =
    slug(this.title) +
    '-' +
    ((Math.random() * Math.pow(36, 6)) | 0).toString(36); // "|" is a bitwise or operator
};

ArticleSchema.methods.toJSONFor = function() {
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
  };
};

ArticleSchema.pre('validate', function(next) {
  if (!this.slug) {
    this.slugify();
  }
  next();
});

const articleModel = mongoose.model('Article', ArticleSchema);

module.exports = articleModel;
