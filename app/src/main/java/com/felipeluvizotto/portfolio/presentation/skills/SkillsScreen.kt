package com.felipeluvizotto.portfolio.presentation.skills

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.slideInVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.felipeluvizotto.portfolio.R
import kotlinx.coroutines.delay

enum class SkillCategory {
    FRONTEND, BACKEND, MOBILE, DATABASE, DEVOPS
}

data class Skill(
    val name: String,
    val iconResId: Int,
    val proficiency: Float, // 0.0 to 1.0
    val category: SkillCategory
)

@Composable
fun SkillsScreen() {
    var selectedTabIndex by remember { mutableIntStateOf(0) }
    var isVisible by remember { mutableStateOf(false) }

    LaunchedEffect(key1 = true) {
        isVisible = true
    }

    val skillsList = remember {
        listOf(
            Skill("Java", R.drawable.ic_java, 0.95f, SkillCategory.BACKEND),
            Skill("Spring Boot", R.drawable.ic_spring, 0.9f, SkillCategory.BACKEND),
            Skill("Kotlin", R.drawable.ic_kotlin, 0.85f, SkillCategory.MOBILE),
            Skill("Android", R.drawable.ic_android, 0.9f, SkillCategory.MOBILE),
            Skill("React", R.drawable.ic_react, 0.8f, SkillCategory.FRONTEND),
            Skill("JavaScript", R.drawable.ic_javascript, 0.85f, SkillCategory.FRONTEND),
            Skill("HTML/CSS", R.drawable.ic_html, 0.9f, SkillCategory.FRONTEND),
            Skill("PostgreSQL", R.drawable.ic_postgresql, 0.85f, SkillCategory.DATABASE),
            Skill("MongoDB", R.drawable.ic_mongodb, 0.8f, SkillCategory.DATABASE),
            Skill("Docker", R.drawable.ic_docker, 0.75f, SkillCategory.DEVOPS),
            Skill("Kubernetes", R.drawable.ic_kubernetes, 0.7f, SkillCategory.DEVOPS),
            Skill("AWS", R.drawable.ic_aws, 0.75f, SkillCategory.DEVOPS)
        )
    }

    val categories = listOf(
        "Todos" to null,
        stringResource(id = R.string.frontend) to SkillCategory.FRONTEND,
        stringResource(id = R.string.backend) to SkillCategory.BACKEND,
        stringResource(id = R.string.mobile) to SkillCategory.MOBILE,
        stringResource(id = R.string.database) to SkillCategory.DATABASE,
        stringResource(id = R.string.devops) to SkillCategory.DEVOPS
    )

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
                text = stringResource(id = R.string.my_skills),
                style = MaterialTheme.typography.headlineMedium,
                color = MaterialTheme.colorScheme.primary,
                modifier = Modifier.padding(bottom = 16.dp)
            )
        }

        var tabsVisible by remember { mutableStateOf(false) }
        LaunchedEffect(key1 = isVisible) {
            delay(150)
            tabsVisible = true
        }

        AnimatedVisibility(
            visible = tabsVisible,
            enter = fadeIn() + slideInVertically(initialOffsetY = { it / 3 })
        ) {
            TabRow(
                selectedTabIndex = selectedTabIndex,
                containerColor = MaterialTheme.colorScheme.surfaceVariant,
                contentColor = MaterialTheme.colorScheme.primary
            ) {
                categories.forEachIndexed { index, (name, _) ->
                    Tab(
                        selected = selectedTabIndex == index,
                        onClick = { selectedTabIndex = index },
                        text = { Text(name) }
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        val filteredSkills = skillsList.filter { skill ->
            val selectedCategory = categories[selectedTabIndex].second
            selectedCategory == null || skill.category == selectedCategory
        }

        var skillsVisible by remember { mutableStateOf(false) }
        LaunchedEffect(key1 = tabsVisible) {
            delay(300)
            skillsVisible = true
        }

        AnimatedVisibility(
            visible = skillsVisible,
            enter = fadeIn() + slideInVertically(initialOffsetY = { it / 3 })
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .verticalScroll(rememberScrollState())
            ) {
                filteredSkills.forEach { skill ->
                    SkillItem(
                        skill = skill,
                        modifier = Modifier.padding(vertical = 8.dp)
                    )
                }

                // Add spacer at the bottom for better scrolling experience
                Spacer(modifier = Modifier.height(72.dp))
            }
        }
    }
}

@Composable
fun SkillItem(skill: Skill, modifier: Modifier = Modifier) {
    var progressVisible by remember { mutableStateOf(false) }

    LaunchedEffect(key1 = skill) {
        delay(300)
        progressVisible = true
    }

    Column(modifier = modifier.fillMaxWidth()) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.fillMaxWidth()
        ) {
            Icon(
                painter = painterResource(id = skill.iconResId),
                contentDescription = skill.name,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(24.dp)
            )

            Text(
                text = skill.name,
                style = MaterialTheme.typography.titleMedium,
                modifier = Modifier.padding(start = 8.dp)
            )

            Spacer(modifier = Modifier.weight(1f))

            Text(
                text = "${(skill.proficiency * 100).toInt()}%",
                style = MaterialTheme.typography.bodyMedium
            )
        }

        Spacer(modifier = Modifier.height(4.dp))

        val animatedProgress by animateFloatAsState(
            targetValue = if (progressVisible) skill.proficiency else 0f,
            animationSpec = tween(durationMillis = 1000),
            label = "progress"
        )

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(8.dp)
                .clip(RoundedCornerShape(4.dp))
                .background(MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Box(
                modifier = Modifier
                    .fillMaxWidth(animatedProgress)
                    .height(8.dp)
                    .clip(RoundedCornerShape(4.dp))
                    .background(getColorForSkillCategory(skill.category))
            )
        }
    }
}

@Composable
fun getColorForSkillCategory(category: SkillCategory) = when(category) {
    SkillCategory.FRONTEND -> MaterialTheme.colorScheme.primary
    SkillCategory.BACKEND -> MaterialTheme.colorScheme.secondary
    SkillCategory.MOBILE -> MaterialTheme.colorScheme.tertiary
    SkillCategory.DATABASE -> MaterialTheme.colorScheme.error
    SkillCategory.DEVOPS -> MaterialTheme.colorScheme.surfaceTint
}
