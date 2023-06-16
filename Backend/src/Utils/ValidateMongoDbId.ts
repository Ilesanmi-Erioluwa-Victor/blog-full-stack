import mongoose from 'mongoose';

const ValidateMongoDbId = (id: string) => {
  const isValidId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidId) throw new Error('Invalid Id passed, check your Id');
};

export default ValidateMongoDbId;
