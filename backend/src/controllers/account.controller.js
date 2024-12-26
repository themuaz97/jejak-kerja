// account.controller.js
import cloudinary from "../config/cloudinary.js";
import prisma from "../db/prisma.js";

export const updateMe = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { firstName, lastName, username, phoneNo } = req.body;

    // Create update data object
    const updateData = {
      first_name: firstName,
      last_name: lastName,
      username,
      phone_no: phoneNo,
    };

    // Handle profile image if it exists in the request
    if (req.file) {
      try {
        // Convert buffer to base64
        const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(fileStr, {
          transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto' },
          ],
        });

        // Add profile image URL to update data
        updateData.profile_img = result.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(400).json({
          message: 'Error uploading image to cloud storage',
          error: uploadError.message
        });
      }
    }

    // Update user in database
    const user = await prisma.users.update({
      where: { id: userId },
      data: updateData,
    });

    // Return success response
    res.status(200).json({
      message: 'User updated successfully',
      user
    });

  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({
      message: 'Error updating user',
      error: error.message
    });
  }
};