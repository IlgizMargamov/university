import express, {raw} from "express";
import {getUserName} from "../../utils/jwtTokenUtils.js";
import {myDataSource} from "../../app-data-source.js";
import {User} from "../../orm/entities/User.js";
import {Album} from "../../orm/entities/Album.js";
import {userRepository} from "../../orm/repositories/userRepository.js";
import {albumRepository} from "../../orm/repositories/albumRepository.js";
import {DataStatuses} from "../../enums/DataStatuses.js";
import {subscriptionRepository} from "../../orm/repositories/suscriptionRepository.js";
import {subscriptionProductRepository} from "../../orm/repositories/subscriptionProductRepository.js";
import {ownershipRepository} from "../../orm/repositories/ownershipRepository.js";
import {OwnershipLevels} from "../../enums/OwnershipLevels.js";

export const userController = express.Router();

userController.get('/check', async (req,res)=>{
    console.log("check user")
    const userName = getUserName(req)
    let user = await userRepository.findOne({
        where:{
            nickname : userName
        }
    })

    if (user !== null) {
        user = userRepository.create({
            nickname: userName
        })
        const rootAlbum = await albumRepository.create({
            albumName: user.nickname,
            createdAt: Date.now().toString(),
            lastUpdatedAt: Date.now().toString(),
            status: DataStatuses.ACTIVE.toString(),
            kilobyteSize: 0,
        });
        await albumRepository.save(rootAlbum);

        user.rootAlbumLink = rootAlbum.albumId;
        let subscriptionProductLink = await subscriptionProductRepository.findOne({
            where: {
                productId: BigInt(1)
            }
        });
        const sub = await subscriptionRepository.create({
            productLink: subscriptionProductLink?.productId?.toString(),
            dateTo: Date.now().toString(),
            dateFrom: Date.now().toString(),
        });

        user.subscriptionLink = sub.subscriptionId;
        await subscriptionRepository.save(sub);

        const ownership= await ownershipRepository.create({
            ownedAlbumAlbumId : rootAlbum.albumId,
            userLinkUserId : user.userId,

            ownershipLevel : OwnershipLevels.OWNER.toString(),
        });

        await ownershipRepository.save(ownership);

        await userRepository.save(user);
        res.send(user)
        return user;
    }
    //myDataSource.manager.find(User)

})

userController.post('/register', (req,res)=>{
    res.send("register user")
})