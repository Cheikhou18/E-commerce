<?php

namespace App\Controller;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProductController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/products', name: 'app_product_list', methods: ['GET'])]
    public function getProducts()
    {
        $products = $this->entityManager->getRepository(Product::class)->getAll();

        return $this->json([
            'success' => true,
            'produits' => $products
        ]);
    }
    #[Route('/api/products/popular', name: 'app_product_popular', methods: ['GET'])]
    public function getPopularProducts(): JsonResponse
    {
        $products = $this->entityManager->getRepository(Product::class)
            ->findBy([], ['popularity' => 'DESC']);

        $productData = [];

        foreach ($products as $product) {
            $productData[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'price' => $product->getPrice(),
                'image' => $product->getImage(),
                'stock' => $product->getStock(),
                'popularity' => $product->getPopularity(),
                'id_category' => $product->getIdCategory(),
                'description' => $product->getDescription(),
            ];
        }

        return $this->json([
            'success' => true,
            'produits' => $productData
        ]);
    }

    #[Route('/api/products', name: 'add_product', methods: ['POST'])]
    public function addProduct(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $product = new Product();
        $product->setName($data['name']);
        $product->setPrice($data['price']);
        $product->setImage($data['image']);
        $product->setStock($data['stock']);
        $product->setIdCategory($data['id_category']);
        $product->setDescription($data['description']);
        $product->setPopularity(0);
        $product->setRecommended($data['recommended']);
        $product->setLowStock($data['low_stock']);

        $this->entityManager->persist($product);
        $this->entityManager->flush();

        return new JsonResponse(['success' => true, 'message' => 'Product created!'], 201);
    }

    #[Route('/api/products/{id}', name: 'edit_product', methods: ['PATCH'])]
    public function editProduct($id, Request $request): JsonResponse
    {

        $product = $this->entityManager->getRepository(Product::class)->find($id);

        if (!$product) {
            return new JsonResponse(['success' => false, 'message' => 'Product not found!'], 404);
        }

        $data = json_decode($request->getContent(), true);
        $product->setName($data['name']);
        $product->setPrice($data['price']);
        $product->setImage($data['image']);
        $product->setStock($data['stock']);
        $product->setIdCategory($data['id_category']);
        $product->setDescription($data['description']);
        $product->setRecommended($data['recommended']);
        $product->setLowStock($data['low_stock']);

        $this->entityManager->flush();

        return new JsonResponse(['success' => true, 'message' => 'Product updated!'], 200);
    }

    #[Route('/api/products/{id}', name: 'delete_product', methods: ['DELETE'])]
    public function deleteProduct($id): JsonResponse
    {
        $product = $this->entityManager->getRepository(Product::class)->find($id);

        if (!$product) {
            return new JsonResponse(['success' => false, 'message' => 'Product not found!'], 404);
        }

        $this->entityManager->remove($product);
        $this->entityManager->flush();

        return new JsonResponse(['success' => true, 'message' => 'Product deleted!'], 200);
    }



    #[Route('/api/products/{id}', name: 'app_product_details')]
    public function getProductDetails(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $id = $request->get('id');
        $product = $entityManager->getRepository(Product::class)->find($id);

        if (!$product) {
            return $this->json(['success' => false, 'message' => 'Product does not exist']);
        }

        // Increase popularity of the product

        $popularity = $product->getPopularity() + 1;
        $product->setPopularity($popularity);

        $entityManager->flush();

        $response = [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'image' => $product->getImage(),
            'price' => $product->getPrice(),
            'stock' => $product->getStock(),
            'category' => $product->getIdCategory(),
            'features' => $product->getIdFeatures(),
        ];

        return $this->json([
            'success' => true,
            'response' => $response,
        ]);
    }
}
