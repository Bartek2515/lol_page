<?php

namespace App\Repository;

use App\Entity\CounterGuide;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CounterGuide>
 */
class CounterGuideRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CounterGuide::class);
    }

    public function getCounterGuideById($user, $id)
    {
        $userId = $user->getId();
        return $this->createQueryBuilder('cg')
            ->where('cg.id = :id')
            ->andWhere('cg.user = :userId')
            ->setParameter('id', $id)
            ->setParameter('userId', $userId)
            ->getQuery()
            ->getResult();    
    }

//    /**
//     * @return CounterGuide[] Returns an array of CounterGuide objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CounterGuide
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
