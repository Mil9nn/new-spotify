import { Song } from '../models/song.model.js';
import { Album } from '../models/album.model.js';

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: 'auto',
        });
        return result.secure_url;
    } catch (error) {
        console.log("Error uploading to Cloudinary:", error);
        throw new Error('Failed to upload file to Cloudinary');
    }
}

export const createSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ message: 'Please upload both audio and image files.' });
        }

        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        const audioURL = await uploadToCloudinary(audioFile);
        const imageURL = await uploadToCloudinary(imageFile);

        const song = new Song({
            title,
            artist,
            audioURL,
            imageURL,
            duration,
            albumId: albumId || null,
        });

        await song.save();

        if (albumId) {
            await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } });
            $push: { songs: song._id } // Add the song ID to the album's songs array
        }

        res.status(201).json({ message: 'Song created successfully', song });

    } catch (error) {
        console.log("Error creating song:", error);
        next(error);
    }
}

export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;
        const song = await Song.findByIdAndDelete(id);

        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }

        // Optionally, remove the song from the album if it exists
        if (song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, { $pull: { songs: song._id } });
        }

        res.status(200).json({ message: 'Song deleted successfully' });
    } catch (error) {
        console.log("Error deleting song:", error);
        next(error);
    }
}

