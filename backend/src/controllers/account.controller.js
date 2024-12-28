import cloudinary from "../config/cloudinary.js";
import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";

export const updateMe = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { firstName, lastName, username, phoneNo, birthAt } = req.body;

    // Create update data object
    const updateData = {
      first_name: firstName,
      last_name: lastName,
      username,
      phone_no: phoneNo,
      birth_at: birthAt,
    };

    // Handle profile image if it exists in the request
    if (req.file) {
      try {
        // Convert buffer to base64
        const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(fileStr);

        // Get URL of uploaded image with transformations
        const url = cloudinary.url(result.public_id, {
          transformation: [
            {
              quality: 'auto',
              fetch_format: 'auto',
            },
            {
              width: 500,
              height: 500,
              crop: 'fill',
              gravity: 'auto',
            },
          ],
        });

        updateData.profile_img = url;
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
      message: 'account updated successfully',
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

export const updatePassword = async (req, res) => { 
  try {
    const userId = req.user.user_id;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    const user = await prisma.users.findFirst({
      where: {
        id: userId,
        ssoProviders: {
          some: {
            provider: "internal"
          }
        }
      },
      include: {
        ssoProviders: true
      }
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters long',
      });
    }

    // Check if old password matches
    const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Old password is incorrect',
      });
    }

    // Check if new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        message: 'New password and confirm new password do not match',
      });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: { password: hashedPassword },
    })

    res.status(200).json({
      message: 'Password updated successfully',
      updatedUser
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error updating password',
      error: error.message
    });
  }
}