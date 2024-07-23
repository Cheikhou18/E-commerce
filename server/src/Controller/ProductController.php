<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Product;

class ProductController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/products', name: 'app_product_list')]
    public function index(): JsonResponse
    {
        $products = $this->entityManager->getRepository(Product::class)->getAll();
        // dd($products);

        return $this->json([
            'success' => true,  
            'produits' => $products
        ]);
    }
}