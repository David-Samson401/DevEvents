import { Event } from "@/database/event.model";
import connectDB from "@/lib/mongodb";

export const getAllEvents = async () => {
  try {
    await connectDB();
    const events = await Event.find().sort({ date: 1 }).lean();
    return events;
  } catch {
    return [];
  }
};

export const getUpcomingEvents = async (limit?: number) => {
  try {
    await connectDB();
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

    let query = Event.find({ date: { $gte: today } }).sort({ date: 1 });

    if (limit) {
      query = query.limit(limit);
    }

    const events = await query.lean();
    return events;
  } catch {
    return [];
  }
};

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();
    const event = await Event.findOne({ slug });

    if (!event) {
      return [];
    }

    return await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();
  } catch {
    return [];
  }
};

export const getEventBySlug = async (slug: string) => {
  try {
    await connectDB();

    const normalizedSlug = slug.trim().toLowerCase();
    if (!normalizedSlug) return null;

    const event = await Event.findOne({ slug: normalizedSlug }).lean();
    return event;
  } catch {
    return null;
  }
};
