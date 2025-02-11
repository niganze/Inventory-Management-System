import Person from '../models/Person.js';

export const createPerson = async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllPeople = async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPersonById = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).json({ message: 'Person not found' });
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePerson = async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPerson) return res.status(404).json({ message: 'Person not found' });
    res.status(200).json(updatedPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePerson = async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (!deletedPerson) return res.status(404).json({ message: 'Person not found' });
    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};