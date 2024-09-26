import bcrypt from 'bcrypt';

export const createHashKey = async(key, saltRounds)=>{
    const hashedKey = await bcrypt.hash(key,saltRounds);
    return hashedKey;
};

export const verifyHashKey = async (hashedKey,key)=>{
    const verificationKey = await bcrypt.compare(key, hashedKey)
    return verificationKey
}