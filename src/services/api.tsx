import { request, gql } from 'graphql-request'
import { GRAPH_API_LOTTERY } from '@/utils/constants'
import { LotteryRoundGraphEntity } from '@/utils/types';

export const getGraphLotteries = async (): Promise<LotteryRoundGraphEntity[]> => {
  try {
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
    return response.lottxes;
  } catch (error) {
    console.error(error)
    return []
  }
}


export const getGraphUserLotteries = async (address) => {
  let user = {
    address,
    totalUsdtCosts: 0,
    totalTickets: 0,
    rounds: [],
  }

  try {

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
                    endTime
                    status
                    totalUsers
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
        rounds: userRes.rounds.map((round) => {
          return {
            lotteryId: round?.lottx?.id,
            endTime: round?.lottx?.endTime,
            claimed: round?.claimed,
            totalTickets: round?.totalTickets,
            totalUsers: round?.totalUsers,
            status: round?.lottx?.status,
          }
        }),
      }
    }
  } catch (error) {
    console.error(error)
  }
  return user;
}

