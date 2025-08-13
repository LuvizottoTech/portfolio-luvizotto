package com.felipeluvizotto.portfolio.presentation.projects

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.slideInVertically
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Code
import androidx.compose.material.icons.filled.Launch
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Chip
import androidx.compose.material3.ChipDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.felipeluvizotto.portfolio.R
import kotlinx.coroutines.delay

data class Project(
    val id: Int,
    val title: String,
    val description: String,
    val imageUrl: String,
    val projectUrl: String,
    val codeUrl: String,
    val technologies: List<String>,
    val categories: List<ProjectCategory>,
    val featured: Boolean = false
)

enum class ProjectCategory {
    WEB, MOBILE, BACKEND, DEVOPS, DESKTOP;

    fun getDisplayName(): String = when(this) {
        WEB -> "Web"
        MOBILE -> "Mobile"
        BACKEND -> "Backend"
        DEVOPS -> "DevOps"
        DESKTOP -> "Desktop"
    }
}

@Composable
fun ProjectsScreen() {
    var isVisible by remember { mutableStateOf(false) }
    var selectedCategory by remember { mutableStateOf<ProjectCategory?>(null) }

    LaunchedEffect(key1 = true) {
        isVisible = true
    }

    val projects = remember {
        listOf(
            Project(
                id = 1,
                title = "E-commerce Platform",
                description = "Plataforma completa de e-commerce com gestão de produtos, carrinho, pagamentos e área do cliente. Desenvolvido com microserviços.",
                imageUrl = "https://via.placeholder.com/300x200",
                projectUrl = "https://example.com/ecommerce",
                codeUrl = "https://github.com/example/ecommerce",
                technologies = listOf("Java", "Spring Boot", "React", "PostgreSQL", "Docker"),
                categories = listOf(ProjectCategory.WEB, ProjectCategory.BACKEND),
                featured = true
            ),
            Project(
                id = 2,
                title = "App de Entregas",
                description = "Aplicativo de entrega com rastreamento em tempo real, notificações push e integração com mapas.",
                imageUrl = "https://via.placeholder.com/300x200",
                projectUrl = "https://example.com/delivery-app",
                codeUrl = "https://github.com/example/delivery-app",
                technologies = listOf("Kotlin", "Android", "Firebase", "Google Maps API"),
                categories = listOf(ProjectCategory.MOBILE)
            ),
            Project(
                id = 3,
                title = "Sistema de Gestão",
                description = "Sistema interno para gestão de equipes, projetos e recursos com dashboards analíticos e relatórios personalizados.",
                imageUrl = "https://via.placeholder.com/300x200",
                projectUrl = "https://example.com/management",
                codeUrl = "https://github.com/example/management",
                technologies = listOf("Java", "Spring", "Angular", "MySQL", "Grafana"),
                categories = listOf(ProjectCategory.WEB, ProjectCategory.BACKEND),
                featured = true
            ),
            Project(
                id = 4,
                title = "API de Pagamentos",
                description = "API para processamento de pagamentos com suporte a múltiplas moedas e gateways. Inclui documentação OpenAPI.",
                imageUrl = "https://via.placeholder.com/300x200",
                projectUrl = "https://example.com/payment-api",
                codeUrl = "https://github.com/example/payment-api",
                technologies = listOf("Java", "Spring Boot", "MongoDB", "Docker", "Kafka"),
                categories = listOf(ProjectCategory.BACKEND)
            ),
            Project(
                id = 5,
                title = "Infraestrutura como Código",
                description = "Templates para provisionamento de infraestrutura em nuvem AWS com alta disponibilidade e escalabilidade.",
                imageUrl = "https://via.placeholder.com/300x200",
                projectUrl = "https://example.com/iac",
                codeUrl = "https://github.com/example/iac",
                technologies = listOf("Terraform", "AWS", "CloudFormation", "Jenkins", "Ansible"),
                categories = listOf(ProjectCategory.DEVOPS)
            )
        )
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        AnimatedVisibility(
            visible = isVisible,
            enter = fadeIn() + slideInVertically(initialOffsetY = { it / 2 })
        ) {
            Text(
                text = stringResource(id = R.string.my_projects),
                style = MaterialTheme.typography.headlineMedium,
                color = MaterialTheme.colorScheme.primary
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Category filters
        var filtersVisible by remember { mutableStateOf(false) }
        LaunchedEffect(key1 = isVisible) {
            delay(150)
            filtersVisible = true
        }

        AnimatedVisibility(
            visible = filtersVisible,
            enter = fadeIn() + slideInVertically(initialOffsetY = { it / 3 })
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 16.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                FilterChip(
                    selected = selectedCategory == null,
                    onClick = { selectedCategory = null },
                    label = { Text("Todos") }
                )

                ProjectCategory.values().forEach { category ->
                    FilterChip(
                        selected = selectedCategory == category,
                        onClick = { selectedCategory = category },
                        label = { Text(category.getDisplayName()) }
                    )
                }
            }
        }

        // Projects list
        val filteredProjects = projects.filter { project ->
            selectedCategory == null || project.categories.contains(selectedCategory)
        }

        var projectsVisible by remember { mutableStateOf(false) }
        LaunchedEffect(key1 = filtersVisible) {
            delay(300)
            projectsVisible = true
        }

        AnimatedVisibility(
            visible = projectsVisible,
            enter = fadeIn() + slideInVertically(initialOffsetY = { it / 3 })
        ) {
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(16.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                items(filteredProjects) { project ->
                    ProjectCard(project = project)
                }

                // Add spacer at the bottom for better scrolling experience
                item { Spacer(modifier = Modifier.height(72.dp)) }
            }
        }
    }
}

@Composable
fun ProjectCard(project: Project) {
    Card(
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        modifier = Modifier
            .fillMaxWidth()
            .clickable {  }
    ) {
        Column {
            // Project image
            AsyncImage(
                model = project.imageUrl,
                contentDescription = project.title,
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .fillMaxWidth()
                    .aspectRatio(16f / 9f)
                    .clip(RoundedCornerShape(topStart = 12.dp, topEnd = 12.dp))
            )

            Column(modifier = Modifier.padding(16.dp)) {
                // Title and featured badge
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                        text = project.title,
                        style = MaterialTheme.typography.titleLarge,
                        modifier = Modifier.weight(1f)
                    )

                    if (project.featured) {
                        Chip(
                            onClick = { },
                            colors = ChipDefaults.chipColors(
                                containerColor = MaterialTheme.colorScheme.tertiary,
                                labelColor = MaterialTheme.colorScheme.onTertiary
                            )
                        ) {
                            Text("Destaque")
                        }
                    }
                }

                // Categories
                Row(
                    modifier = Modifier.padding(vertical = 8.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    project.categories.forEach { category ->
                        Chip(
                            onClick = { },
                            colors = ChipDefaults.chipColors(
                                containerColor = MaterialTheme.colorScheme.secondaryContainer,
                                labelColor = MaterialTheme.colorScheme.onSecondaryContainer
                            )
                        ) {
                            Text(category.getDisplayName())
                        }
                    }
                }

                // Description
                Text(
                    text = project.description,
                    style = MaterialTheme.typography.bodyMedium,
                    overflow = TextOverflow.Ellipsis,
                    maxLines = 3,
                    modifier = Modifier.padding(vertical = 8.dp)
                )

                // Technologies
                Text(
                    text = stringResource(id = R.string.technologies_used),
                    style = MaterialTheme.typography.labelLarge,
                    modifier = Modifier.padding(top = 8.dp, bottom = 4.dp)
                )

                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(bottom = 16.dp)
                ) {
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        project.technologies.take(3).forEach { tech ->
                            Chip(
                                onClick = { },
                                colors = ChipDefaults.chipColors(
                                    containerColor = MaterialTheme.colorScheme.primaryContainer,
                                    labelColor = MaterialTheme.colorScheme.onPrimaryContainer
                                )
                            ) {
                                Text(text = tech)
                            }
                        }

                        if (project.technologies.size > 3) {
                            Chip(
                                onClick = { },
                                colors = ChipDefaults.chipColors(
                                    containerColor = MaterialTheme.colorScheme.primaryContainer,
                                    labelColor = MaterialTheme.colorScheme.onPrimaryContainer
                                )
                            ) {
                                Text(text = "+${project.technologies.size - 3}")
                            }
                        }
                    }
                }

                // Action buttons
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Button(
                        onClick = { /* Open project URL */ },
                        modifier = Modifier.weight(1f),
                        colors = ButtonDefaults.buttonColors()
                    ) {
                        Icon(imageVector = Icons.Default.Launch, contentDescription = null)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(stringResource(id = R.string.view_project))
                    }

                    OutlinedButton(
                        onClick = { /* Open code URL */ },
                        modifier = Modifier.weight(1f)
                    ) {
                        Icon(imageVector = Icons.Default.Code, contentDescription = null)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(stringResource(id = R.string.view_code))
                    }
                }
            }
        }
    }
}
