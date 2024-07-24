<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Product;


class ProductDetailsController extends AbstractController
{
    #[Route('/product/{id}', name: 'product_details')]
    public function productdetails(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $id = $request->get('id');
        $product = $entityManager->getRepository(Product::class)->find($id);
        return $this->json([
            'product' => $product,
        ]);
    }
}
