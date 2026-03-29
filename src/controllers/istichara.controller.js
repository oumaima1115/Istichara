const Istichara = require('../models/Istichara');
const User = require('../models/User');
const Coupon = require('../models/Coupon');
const nodemailer = require('nodemailer');
const validateIstichara = require('../utils/validateIstichara');

// GET /istichara → list all Istichara (lawyer sees all, client sees own)
exports.getAll = async (req, res) => {
  try {
    const data = await Istichara.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching Isticharas',
      error: error.message
    });
  }
};

// POST /istichara → create a new Istichara request (client only)
exports.create = async (req, res) => {
  try {

    const errors = validateIstichara(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const {
      clientId,
      lawyerId,
      subject,
      message,
      scheduledDate,
      scheduledSlot,
      couponCode,
    } = req.body;

    const files = req.files || [];

    const attachments = files.map((file) => {
      return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    });

    let coupon = null;

    if (couponCode) {
      coupon = await Coupon.findOne({ code: couponCode });

      if (!coupon) {
        return res.status(400).json({
          success: false,
          message: 'Invalid coupon code'
        });
      }

      if (coupon.expirationDate < new Date()) {
        return res.status(400).json({
          success: false,
          message: 'Coupon expired'
        });
      }

      // check if already used by this user
      if (coupon.usedBy.includes(clientId)) {
        return res.status(400).json({
          success: false,
          message: 'Coupon already used by this user'
        });
      }

      // add user to usedBy
      coupon.usedBy.push(clientId);
      await coupon.save();
    }

    const istichara = await Istichara.create({
      clientId,
      lawyerId,
      subject,
      message,
      scheduledDate,
      scheduledSlot,
      attachments,
      couponCode
    });

    res.status(201).json({
      success: true,
      message: 'Istichara created successfully',
      data: istichara
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating Istichara',
      error: error.message
    });
  }
};

// PUT /istichara/:id → update Istichara (client only)
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const istichara = await Istichara.findById(id);
    if (!istichara) {
      return res.status(404).json({ success: false, message: 'Istichara not found' });
    }

    const errors = validateIstichara(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    Object.assign(istichara, req.body);

    const updated = await istichara.save();

    res.status(200).json({
      success: true,
      message: 'Istichara updated',
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating Istichara',
      error: error.message
    });
  }
};

// DELETE /istichara/:id → delete Istichara (client only)
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const istichara = await Istichara.findByIdAndDelete(id);

    if (!istichara) {
      return res.status(404).json({ success: false, message: 'Istichara not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Istichara deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting Istichara',
      error: error.message
    });
  }
};

// PATCH /istichara/:id/accept → lawyer accepts request
exports.accept = async (req, res) => {
  try {
    const { id } = req.params;
    const istichara = await Istichara.findById(id);
    if (!istichara)
      return res.status(404).json({ success: false, message: 'Istichara not found' });

    // fetch client email
    const client = await User.findById(istichara.clientId);
    if (!client)
      return res.status(404).json({ success: false, message: 'Client not found' });

    if (istichara.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Cannot accept this istichara. Current status is "${istichara.status}"`
      });
    }

    istichara.status = 'accepted';
    await istichara.save();

    sendEmail(
      client.email,
      'Istichara request accepted',
      ` <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e0e0e0;">
            
            <div style="background-color: #28a745; color: white; padding: 16px; text-align: center;">
              <h2 style="margin: 0;">Istichara Accepted</h2>
            </div>

            <div style="padding: 20px; color: #333;">
              <p>Hello,</p>

              <p>Your consultation request has been accepted by the lawyer.</p>

              <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 8px;">
                <p><strong>Subject:</strong> ${istichara.subject}</p>
                <p><strong>Date:</strong> ${new Date(istichara.scheduledDate).toDateString()}</p>
                <p><strong>Time:</strong> ${istichara.scheduledSlot}</p>
                <p><strong>Status:</strong> Accepted</p>
              </div>

              <p style="margin-top: 20px;">
                You will be contacted according to the scheduled time.
              </p>

              <p>Regards,<br/>Istichara Team</p>
            </div>

            <div style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #777;">
              © ${new Date().getFullYear()} Istichara. All rights reserved.
            </div>

          </div>
        </div>
        `
    );

    res.status(200).json({ success: true, message: 'Istichara accepted', data: istichara });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error accepting Istichara', error: error.message });
  }
};

// PATCH /istichara/:id/refuse → lawyer refuses request
exports.refuse = async (req, res) => {
  try {
    const { id } = req.params;
    const istichara = await Istichara.findById(id);
    if (!istichara)
      return res.status(404).json({ success: false, message: 'Istichara not found' });

    const client = await User.findById(istichara.clientId);
    if (!client)
      return res.status(404).json({ success: false, message: 'Client not found' });

    if (istichara.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Cannot refuse this istichara. Current status is "${istichara.status}"`
      });
    }

    istichara.status = 'refused';
    await istichara.save();

    sendEmail(
      client.email,
      'Istichara request refused',
      ` <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e0e0e0;">
          
          <div style="background-color: #dc3545; color: white; padding: 16px; text-align: center;">
            <h2 style="margin: 0;">Istichara Refused</h2>
          </div>

          <div style="padding: 20px; color: #333;">
            <p>Hello,</p>

            <p>Your consultation request has been reviewed and refused by the lawyer.</p>

            <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 8px;">
              <p><strong>Subject:</strong> ${istichara.subject}</p>
              <p><strong>Date:</strong> ${new Date(istichara.scheduledDate).toDateString()}</p>
              <p><strong>Time:</strong> ${istichara.scheduledSlot}</p>
              <p><strong>Status:</strong> Refused</p>
            </div>

            <p style="margin-top: 20px;">
              You can submit a new request or choose another lawyer if needed.
            </p>

            <p>Regards,<br/>Istichara Team</p>
          </div>

          <div style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #777;">
            © ${new Date().getFullYear()} Istichara. All rights reserved.
          </div>

        </div>
      </div>
      `
    );

    res.status(200).json({ success: true, message: 'Istichara refused', data: istichara });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error refusing Istichara', error: error.message });
  }
};

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    });

    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error('Email sending error:', err);
  }
};