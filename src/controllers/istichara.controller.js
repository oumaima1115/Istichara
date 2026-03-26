
/*--------------------------------------Starting work--------------------------------------*/



const Istichara = require("../models/Istichara");

// GET
exports.getIstichara = async (req, res) => {
  try {
    const { role, userId } = req.query;

    let filter = {};

    if (role === "client") filter.clientId = userId;
    if (role === "lawyer") filter.lawyerId = userId;

    const data = await Istichara.find(filter)
      .populate("clientId", "name email")
      .populate("lawyerId", "name specialty");

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// CREATE (🔥 slot check هنا بدل middleware)
exports.createIstichara = async (req, res) => {
  try {
    const { lawyerId, scheduledDate, scheduledSlot } = req.body;

    // check if slot already booked
    const existing = await Istichara.findOne({
      lawyerId,
      scheduledDate,
      scheduledSlot
    });

    if (existing) {
      return res.status(400).json({
        message: "This slot is already reserved"
      });
    }
    
    /*----- save files into uploads folder or DB(Data Base) ------ */

    const istichara = new Istichara(req.body);
    await istichara.save();

    res.status(201).json(istichara);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// UPDATE
exports.updateIstichara = async (req, res) => {
  try {
    const istichara = await Istichara.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!istichara) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(istichara);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// DELETE
exports.deleteIstichara = async (req, res) => {
  try {
    const istichara = await Istichara.findByIdAndDelete(req.params.id);

    if (!istichara) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ACCEPT
exports.acceptIstichara = async (req, res) => {
  try {
    const istichara = await Istichara.findByIdAndUpdate(
      req.params.id,
      { status: "accepted" },
      { new: true }
    );
    /* ------- Code Email  envoi email avec "nodemailer" ----------- */
    res.json(istichara);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// REFUSE
exports.refuseIstichara = async (req, res) => {
  try {
    const istichara = await Istichara.findByIdAndUpdate(
      req.params.id,
      { status: "refused" },
      { new: true }
    );

    res.json(istichara);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};