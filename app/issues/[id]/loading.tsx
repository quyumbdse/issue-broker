import { Skeleton } from '@/app/components';
import { Box, Flex, Card } from '@radix-ui/themes';

const LoadingIssueDeatilsPage = () => {
  return (
    <Box className="space-y-3 max-w-xl">
          <Skeleton/>
          <Flex gap='3'>
                <Skeleton width='5rem'/>
                <Skeleton width='8rem'/>
          </Flex>
          <Card className='prose'>
              <Skeleton count={3}/>
          </Card> 
      </Box>
  )
}

export default LoadingIssueDeatilsPage