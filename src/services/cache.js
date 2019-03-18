import cache from '../config/express-cache'
import md5 from 'md5' 

const CacheService = {};

CacheService.checkCache = async ({hashPrefix, args, resolver}) => {
  let hash = hashPrefix
  if(args) {
    hash = hash + md5(JSON.stringify(args))
  }

  const cacheResult = await cache.get(hash);

  if(cacheResult){
    return JSON.parse(cacheResult)
  }

  const result = await resolver(args, hash)

  await cache.set(hash, JSON.stringify(result));

  return result
}

CacheService.deleteByKey = async key => {
  await cache.del(key, (error, count) => {
    console.log('key: ', key);
		console.log('home_hire.error',error);
		console.log('home_hire.count',count);
	});
}

export default CacheService