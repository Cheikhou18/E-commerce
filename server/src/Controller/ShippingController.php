<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class ShippingController extends AbstractController
{
    #[Route('/api/ship', name: 'app_shipping')]
    public function ship(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), false);

        $initialAddress = "24 Rue Pasteur, 94270 Le Kremlin-Bicêtre";
        $deliveryAddress = "$data->address, $data->zipcode $data->city";

        $url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" . urlencode($initialAddress) . "&destinations=" . urlencode($deliveryAddress) . "&key=AIzaSyAsjQ-lF6Pr2woKUm_8tQpKGFSazUPbUwA";

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);

        if (!$response) return $this->json(['success' => false]);

        return $this->json([
            'success' => true,
            'response' => json_decode($response, true)
        ]);
    }

    #[Route('/api/delivery', name: 'calculate_delivery', methods: ['POST'])]
    public function calculateDelivery(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), false);
        $distance = $data->pricePerKm;

        return $this->json(['success' => true]);
    }
}
