const audioRepository = require("../repositories/audio_repository");
const { db } = require("../common/functions");

function Resource() {
  this.getAudios = getAudios;
  this.addAudio = addAudio;
  this.editAudio = editAudio;
  this.deleteAudio = deleteAudio;
}

async function getAudios(req, res, next) {
  try {
    const result = await audioRepository.queryAudios(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function addAudio(req, res, next) {
  try {
    const audio_id = db.genID("AUD");

    req.body.id = audio_id;

    await audioRepository.insertAudio(req.body);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

async function editAudio(req, res, next) {
  try {
    const { id } = req.body;

    if (!id) return res.status(403).json("audio/id-not-found");

    await audioRepository.updateAudio(req.body);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

async function deleteAudio(req, res, next) {
  try {
    const { id } = req.body;

    if (!id) return res.status(403).json("audio/id-not-found");

    await audioRepository.deleteAudio(req.body);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

module.exports = new Resource();
