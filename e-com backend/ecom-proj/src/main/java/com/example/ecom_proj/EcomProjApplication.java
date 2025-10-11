
package com.example.ecom_proj;

import com.example.ecom_proj.model.Product;
import com.example.ecom_proj.model.Review;
import com.example.ecom_proj.repo.ProductRepository;
import com.example.ecom_proj.repo.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@SpringBootApplication
public class EcomProjApplication {
	public static void main(String[] args) {
		SpringApplication.run(EcomProjApplication.class, args);
	}
}

@Component
class DataInitializer implements CommandLineRunner {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ReviewRepository reviewRepository;

	@Override
	public void run(String... args) throws Exception {
		// Create Product 1
		Product p1 = new Product();
		p1.setName("QuantumCore Processor");
		p1.setBrand("SynthTech");
		p1.setPrice(350.00);
		p1.setDiscountPrice(299.99);
		p1.setStockQuantity(45);
		p1.setImages(Arrays.asList("https://picsum.photos/seed/1/600/600", "https://picsum.photos/seed/1a/600/600"));
		p1.setShortDescription("Next-gen processor for high-performance computing.");
		p1.setFullDescription("The QuantumCore Processor features cutting-edge technology with 12 cores, 24 threads, and revolutionary quantum acceleration.");
		p1.setCategory("Processors");
		p1.setAverageRating(4.8);
		p1.setReviewCount(120);
		p1.setTags(Arrays.asList("gaming", "professional", "high-performance"));
		p1.setSpecifications(Map.of("cores", "12", "threads", "24", "socket", "AM5"));
		productRepository.save(p1);

		// Create Reviews for Product 1
		Review r1p1 = new Review();
		r1p1.setProduct(p1);
		r1p1.setReviewerName("TechEnthusiast92");
		r1p1.setRating(5);
		r1p1.setComment("Incredible performance boost! Gaming and rendering are lightning fast.");
		r1p1.setDate(LocalDate.parse("2024-08-15"));
		r1p1.setVerified(true);

		Review r2p1 = new Review();
		r2p1.setProduct(p1);
		r2p1.setReviewerName("BuilderPro");
		r2p1.setRating(4);
		r2p1.setComment("Great processor but runs a bit hot under heavy load.");
		r2p1.setDate(LocalDate.parse("2024-08-10"));
		r2p1.setVerified(true);
		reviewRepository.saveAll(List.of(r1p1, r2p1));

		// Create Product 2
		Product p2 = new Product();
		p2.setName("NovaGlow Gaming Mouse");
		p2.setBrand("PixelPerfect");
		p2.setPrice(79.99);
		p2.setStockQuantity(150);
		p2.setImages(Arrays.asList("https://picsum.photos/seed/2/600/600"));
		p2.setShortDescription("Ergonomic gaming mouse with customizable RGB.");
		p2.setCategory("Peripherals");
		p2.setAverageRating(4.6);
		p2.setReviewCount(250);
		p2.setTags(Arrays.asList("gaming", "rgb", "wireless"));
		productRepository.save(p2);

		// PASTE THIS CODE INTO YOUR DataInitializer's run() METHOD

// Create Product 3
		Product p3 = new Product();
		p3.setName("AeroType Mechanical Keyboard");
		p3.setBrand("KeyChron");
		p3.setPrice(125.50);
		p3.setDiscountPrice(110.00);
		p3.setStockQuantity(80);
		p3.setImages(List.of("https://picsum.photos/seed/3/600/600", "https://picsum.photos/seed/3a/600/600"));
		p3.setShortDescription("A sleek, low-profile mechanical keyboard for coders and gamers.");
		p3.setCategory("Peripherals");
		p3.setAverageRating(4.9);
		p3.setReviewCount(310);
		p3.setTags(List.of("mechanical", "wireless", "programming"));
		p3.setSpecifications(Map.of("switches", "Hot-swappable", "layout", "75%", "connectivity", "Wireless/USB-C"));
		productRepository.save(p3);

// Create Product 4
		Product p4 = new Product();
		p4.setName("CrystalView 4K Monitor");
		p4.setBrand("ViewSonic");
		p4.setPrice(450.00);
		p4.setStockQuantity(30);
		p4.setImages(List.of("https://picsum.photos/seed/4/600/600", "https://picsum.photos/seed/4a/600/600"));
		p4.setShortDescription("A 27-inch 4K UHD monitor with stunning color accuracy.");
		p4.setCategory("Monitors");
		p4.setAverageRating(4.7);
		p4.setReviewCount(95);
		p4.setTags(List.of("4k", "professional", "hdr"));
		p4.setSpecifications(Map.of("size", "27 inch", "resolution", "3840x2160", "refreshRate", "60Hz"));
		productRepository.save(p4);

// Create Product 5
		Product p5 = new Product();
		p5.setName("StealthWave NVMe SSD 1TB");
		p5.setBrand("DataFlow");
		p5.setPrice(150.00);
		p5.setStockQuantity(200);
		p5.setImages(List.of("https://picsum.photos/seed/5/600/600"));
		p5.setShortDescription("Blazing fast 1TB NVMe SSD for instant load times.");
		p5.setCategory("Storage");
		p5.setAverageRating(4.8);
		p5.setReviewCount(180);
		p5.setTags(List.of("nvme", "fast", "reliable"));
		p5.setSpecifications(Map.of("capacity", "1TB", "readSpeed", "7,000 MB/s", "writeSpeed", "6,500 MB/s"));
		productRepository.save(p5);

// Create Product 6
		Product p6 = new Product();
		p6.setName("SonicSurge Wireless Headset");
		p6.setBrand("AudioPhile");
		p6.setPrice(199.99);
		p6.setDiscountPrice(179.99);
		p6.setStockQuantity(65);
		p6.setImages(List.of("https://picsum.photos/seed/6/600/600"));
		p6.setShortDescription("Immersive 7.1 surround sound wireless headset.");
		p6.setCategory("Audio");
		p6.setAverageRating(4.5);
		p6.setReviewCount(220);
		p6.setTags(List.of("wireless", "surround", "noise-cancelling"));
		p6.setSpecifications(Map.of("drivers", "50mm", "battery", "30 hours", "features", "ANC, 7.1 Surround"));
		productRepository.save(p6);

// Create Product 7
		Product p7 = new Product();
		p7.setName("HyperCool CPU Liquid Cooler");
		p7.setBrand("CoolMaster");
		p7.setPrice(130.00);
		p7.setStockQuantity(90);
		p7.setImages(List.of("https://picsum.photos/seed/7/600/600"));
		p7.setShortDescription("Efficient liquid cooling system with addressable RGB.");
		p7.setCategory("Cooling");
		p7.setAverageRating(4.7);
		p7.setReviewCount(150);
		p7.setTags(List.of("liquid", "rgb", "quiet"));
		p7.setSpecifications(Map.of("radiator", "240mm", "fans", "2x120mm PWM", "compatibility", "Intel/AMD"));
		productRepository.save(p7);

// Create Product 8
		Product p8 = new Product();
		p8.setName("Titan X Power Supply 850W");
		p8.setBrand("VoltMax");
		p8.setPrice(160.00);
		p8.setStockQuantity(110);
		p8.setImages(List.of("https://picsum.photos/seed/8/600/600"));
		p8.setShortDescription("850W Gold-rated fully modular power supply unit.");
		p8.setCategory("Components");
		p8.setAverageRating(4.9);
		p8.setReviewCount(200);
		p8.setTags(List.of("modular", "efficient", "reliable"));
		p8.setSpecifications(Map.of("wattage", "850W", "efficiency", "80+ Gold", "modular", "Fully Modular"));
		productRepository.save(p8);

// Create Product 9
		Product p9 = new Product();
		p9.setName("ProStream Webcam 4K");
		p9.setBrand("StreamTech");
		p9.setPrice(89.99);
		p9.setDiscountPrice(74.99);
		p9.setStockQuantity(120);
		p9.setImages(List.of("https://picsum.photos/seed/9/600/600"));
		p9.setShortDescription("Professional 4K webcam for streaming and video calls.");
		p9.setCategory("Peripherals");
		p9.setAverageRating(4.4);
		p9.setReviewCount(180);
		p9.setTags(List.of("4k", "streaming", "microphone"));
		p9.setSpecifications(Map.of("resolution", "4K 30fps", "microphone", "Dual stereo", "focus", "Auto-focus"));
		productRepository.save(p9);

// Create Product 10
		Product p10 = new Product();
		p10.setName("GlowDesk RGB Gaming Mousepad");
		p10.setBrand("LightZone");
		p10.setPrice(45.00);
		p10.setStockQuantity(300);
		p10.setImages(List.of("https://picsum.photos/seed/10/600/600"));
		p10.setShortDescription("Extra-large RGB mousepad with wireless charging zone.");
		p10.setCategory("Peripherals");
		p10.setAverageRating(4.3);
		p10.setReviewCount(95);
		p10.setTags(List.of("rgb", "wireless-charging", "large"));
		p10.setSpecifications(Map.of("size", "800x300mm", "lighting", "RGB LED", "charging", "Qi Wireless"));
		productRepository.save(p10);

		System.out.println("----------- DATABASE INITIALIZED WITH MOCK DATA -----------");
	}
}