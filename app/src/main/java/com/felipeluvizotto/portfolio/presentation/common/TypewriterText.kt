package com.felipeluvizotto.portfolio.presentation.common

import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.text.TextStyle
import kotlinx.coroutines.delay

@Composable
fun TypewriterText(
    texts: List<String>,
    style: TextStyle,
    typingSpeed: Long = 100,
    deletingSpeed: Long = 50,
    delayBetweenTexts: Long = 1000
) {
    var textIndex by remember { mutableIntStateOf(0) }
    var currentText by remember { mutableStateOf("") }
    var isDeleting by remember { mutableStateOf(false) }

    val targetText = texts[textIndex % texts.size]

    LaunchedEffect(key1 = targetText, key2 = isDeleting) {
        while (true) {
            delay(if (isDeleting) deletingSpeed else typingSpeed)

            if (!isDeleting && currentText.length < targetText.length) {
                // Still typing the current word
                currentText = targetText.substring(0, currentText.length + 1)
            } else if (!isDeleting && currentText.length == targetText.length) {
                // Finished typing, wait before deleting
                delay(delayBetweenTexts)
                isDeleting = true
            } else if (isDeleting && currentText.isNotEmpty()) {
                // Deleting the current word
                currentText = currentText.dropLast(1)
            } else if (isDeleting && currentText.isEmpty()) {
                // Move to the next word
                isDeleting = false
                textIndex++
                break
            }
        }
    }

    Text(
        text = currentText,
        style = style
    )
}
