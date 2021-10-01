import { request, gql } from 'graphql-request'
import { GRAPH_API_LOTTERY } from '@/utils/constants'
import { LotteryRoundGraphEntity, UserLotteriesEntity } from '@/utils/types';
import apiData from '@/mock/apiData';

export const getGraphLotteries = async (): Promise<LotteryRoundGraphEntity[]> => {

  try {
    let lotteries = []
    if (GRAPH_API_LOTTERY) {
      const response = await request(
        GRAPH_API_LOTTERY,
        gql`
            query getLotteries {
              lottxes(first: 100, orderDirection: desc, orderBy: block) {
                id
                totalUsers
                totalTickets
                winningTickets
                status
                finalNumber
                startTime
                endTime
                ticketPrice
                prizeDistribution
              }
            }
        `,
      )
      lotteries = response.lottxes;
    } else {
      lotteries = apiData.lotteries
    }

    return lotteries;
  } catch (error) {
    console.error(error)
    return []
  }
}


export const getGraphUserLotteries = async (address): Promise<UserLotteriesEntity> => {
  let user = null
  try {
    if (GRAPH_API_LOTTERY) {
      const response = await request(
        GRAPH_API_LOTTERY,
        gql`
            query getUserLotteries($address: ID!) {
              user(id: $address) {
                id
                totalTickets
                totalRounds
                totalUsdtCosts
                rounds(first: 100, orderDirection: desc, orderBy: block) {
                  id
                  lottx {
                    id
                    startTime
                    endTime
                    status
                    totalUsers
                    ticketPrice
                    totalTickets
                  }
                  claimed
                  totalTickets
                }
              }
            }
        `,
        { address: address.toLowerCase() }
      )
      const userRes = response.user
      if (userRes) {
        user = {
          address,
          totalUsdtCosts: userRes.totalUsdtCosts,
          totalTickets: userRes.totalTickets,
          totalRounds: userRes.totalRounds,
          rounds: userRes.rounds.map((round) => {
            return {
              lotteryId: round?.lottx?.id,
              startTime: round?.lottx?.startTime,
              endTime: round?.lottx?.endTime,
              claimed: round?.claimed,
              totalTickets: round?.totalTickets,
              totalUsers: round?.totalUsers,
              status: round?.lottx?.status,
              ticketPrice: round?.lottx?.ticketPrice,
              roundTotalTickets: round?.lottx?.totalTickets
            }
          }),
        }
      }
    } else {
      user = {
        ...user,
        ...apiData.user
      }
    }
  } catch (error) {
    console.error(error)
  }
  return user;
}

