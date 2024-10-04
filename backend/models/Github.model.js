import mongoose from 'mongoose';

const githubUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String },
  profileUrl: { type: String },
  avatarUrl: { type: String },
}, { timestamps: true });

export const GitHubUser = mongoose.model('GitHubUser', githubUserSchema);

