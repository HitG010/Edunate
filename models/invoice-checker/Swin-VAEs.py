import torch
import torch.nn as nn
import torchvision.transforms as transforms
from torchvision.models import swin_t
from torch.utils.data import DataLoader, Dataset
from torchvision.datasets import ImageFolder

# VAE Model
class VAE(nn.Module):
    def __init__(self, latent_dim=128):
        super(VAE, self).__init__()
        self.encoder = nn.Sequential(
            nn.Conv2d(1, 32, kernel_size=4, stride=2, padding=1),
            nn.ReLU(),
            nn.Conv2d(32, 64, kernel_size=4, stride=2, padding=1),
            nn.ReLU(),
        )
        self.fc_mu = nn.Linear(64 * 56 * 56, latent_dim)
        self.fc_logvar = nn.Linear(64 * 56 * 56, latent_dim)
        self.decoder_fc = nn.Linear(latent_dim, 64 * 56 * 56)
        self.decoder = nn.Sequential(
            nn.ConvTranspose2d(64, 32, kernel_size=4, stride=2, padding=1),
            nn.ReLU(),
            nn.ConvTranspose2d(32, 1, kernel_size=4, stride=2, padding=1),
            nn.Sigmoid(),
        )

    def encode(self, x):
        x = self.encoder(x)
        x = x.view(x.size(0), -1)
        mu = self.fc_mu(x)
        logvar = self.fc_logvar(x)
        return mu, logvar

    def reparameterize(self, mu, logvar):
        std = torch.exp(0.5 * logvar)
        eps = torch.randn_like(std)
        return mu + eps * std

    def decode(self, z):
        x = self.decoder_fc(z).view(-1, 64, 56, 56)
        return self.decoder(x)

    def forward(self, x):
        mu, logvar = self.encode(x)
        z = self.reparameterize(mu, logvar)
        recon = self.decode(z)
        return recon, mu, logvar

# Swin Transformer
class SwinFeatureExtractor(nn.Module):
    def __init__(self):
        super(SwinFeatureExtractor, self).__init__()
        self.swin = swin_t(weights="IMAGENET1K_V1")
        self.swin.fc = nn.Identity()  # Remove classification head

    def forward(self, x):
        return self.swin(x)

# Combined Classifier
class InvoiceForgeryModel(nn.Module):
    def __init__(self, latent_dim=128):
        super(InvoiceForgeryModel, self).__init__()
        self.vae = VAE(latent_dim)
        self.swin = SwinFeatureExtractor()
        self.fc = nn.Sequential(
            nn.Linear(latent_dim + 768, 256),
            nn.ReLU(),
            nn.Linear(256, 1),
            nn.Sigmoid(),
        )

    def forward(self, x):
        recon, mu, logvar = self.vae(x)
        reconstruction_error = torch.mean((recon - x) ** 2, dim=[1, 2, 3])
        swin_features = self.swin(x)
        combined = torch.cat([reconstruction_error.unsqueeze(1), swin_features], dim=1)
        return self.fc(combined)
import torch
import torch.nn as nn
import torchvision.transforms as transforms
from torchvision.models import swin_t
from torch.utils.data import DataLoader, Dataset
from torchvision.datasets import ImageFolder

# VAE Model
class VAE(nn.Module):
    def __init__(self, latent_dim=128):
        super(VAE, self).__init__()
        self.encoder = nn.Sequential(
            nn.Conv2d(1, 32, kernel_size=4, stride=2, padding=1),
            nn.ReLU(),
            nn.Conv2d(32, 64, kernel_size=4, stride=2, padding=1),
            nn.ReLU(),
        )
        self.fc_mu = nn.Linear(64 * 56 * 56, latent_dim)
        self.fc_logvar = nn.Linear(64 * 56 * 56, latent_dim)
        self.decoder_fc = nn.Linear(latent_dim, 64 * 56 * 56)
        self.decoder = nn.Sequential(
            nn.ConvTranspose2d(64, 32, kernel_size=4, stride=2, padding=1),
            nn.ReLU(),
            nn.ConvTranspose2d(32, 1, kernel_size=4, stride=2, padding=1),
            nn.Sigmoid(),
        )

    def encode(self, x):
        x = self.encoder(x)
        x = x.view(x.size(0), -1)
        mu = self.fc_mu(x)
        logvar = self.fc_logvar(x)
        return mu, logvar

    def reparameterize(self, mu, logvar):
        std = torch.exp(0.5 * logvar)
        eps = torch.randn_like(std)
        return mu + eps * std

    def decode(self, z):
        x = self.decoder_fc(z).view(-1, 64, 56, 56)
        return self.decoder(x)

    def forward(self, x):
        mu, logvar = self.encode(x)
        z = self.reparameterize(mu, logvar)
        recon = self.decode(z)
        return recon, mu, logvar

# Swin Transformer
class SwinFeatureExtractor(nn.Module):
    def __init__(self):
        super(SwinFeatureExtractor, self).__init__()
        self.swin = swin_t(weights="IMAGENET1K_V1")
        self.swin.fc = nn.Identity()  # Remove classification head

    def forward(self, x):
        return self.swin(x)

# Combined Classifier
class InvoiceForgeryModel(nn.Module):
    def __init__(self, latent_dim=128):
        super(InvoiceForgeryModel, self).__init__()
        self.vae = VAE(latent_dim)
        self.swin = SwinFeatureExtractor()
        self.fc = nn.Sequential(
            nn.Linear(latent_dim + 768, 256),
            nn.ReLU(),
            nn.Linear(256, 1),
            nn.Sigmoid(),
        )

    def forward(self, x):
        recon, mu, logvar = self.vae(x)
        reconstruction_error = torch.mean((recon - x) ** 2, dim=[1, 2, 3])
        swin_features = self.swin(x)
        combined = torch.cat([reconstruction_error.unsqueeze(1), swin_features], dim=1)
        return self.fc(combined)
