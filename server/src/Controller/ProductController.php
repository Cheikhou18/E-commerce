<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Product;
use Symfony\Component\HttpFoundation\Request;

class ProductController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/products', name: 'app_product_list')]
    public function index()
    {
        $products = $this->entityManager->getRepository(Product::class)->getAll();

        return $this->json([
            'success' => true,
            'produits' => $products
        ]);
    }

    #[Route('/api/products/{id}', name: 'app_product_details')]
    public function productdetails(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $id = $request->get('id');
        $product = $entityManager->getRepository(Product::class)->find($id);

        if (!$product) {
            return $this->json(['success' => false]);
        }

        return $this->json([
            'success' => true,
            'product' => $product,
        ]);
    }
}
