import Channel from "../models/channelModel.js"
import User from "../models/userModel.js"

export const createChannel = async (req, res) => {
    try {
      const { name, members } = req.body;
      const userId = req.userId;
  
      if (!name || !Array.isArray(members) || members.length === 0) {
        return res.status(400).json({ message: "Channel name and members are required." });
      }
  
      const admin = await User.findById(userId);
      if (!admin) {
        return res.status(400).send("Admin User Not Found");
      }
  
      const validMembers = await User.find({ _id: { $in: members } });
      if (validMembers.length !== members.length) {
        return res.status(400).send("Some members are not valid");
      }
  
      const newChannel = new Channel({
        name,
        members,
        admin: userId,
      });
  
      await newChannel.save();
      return res.status(200).json({
        channel: newChannel,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  };