import VehiculosItem from '@/components/VehiculosItem';
import { CarCardsProps } from '@/types/types';

export default function show({ post, hasDeals, hasDealsReceived, deals, lastRejectedDeal, cultdown, myDealStatus, isPostFinalized, dealsLimitReached }: CarCardsProps) {
    return <VehiculosItem post={post} hasDeals={hasDeals} hasDealsReceived={hasDealsReceived} deals={deals} lastRejectedDeal={lastRejectedDeal} cultdown={cultdown} myDealStatus={myDealStatus} isPostFinalized={isPostFinalized} dealsLimitReached={dealsLimitReached} />
}