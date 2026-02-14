import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    console.log(req.params.id);
    console.log(req.user._id);

    if (req.params.id !== req.user._id.toString()) {
      const error = new Error("you are not the owner of this account");
      error.statusCode = 401;
      throw error;
    }
    const subscriptions = await Subscription.find({
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};
